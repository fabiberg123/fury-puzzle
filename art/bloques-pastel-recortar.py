from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage
im=Image.open('/mnt/user-data/uploads/b706b85a-image.jpg').convert('RGB');A=np.asarray(im).astype(int)
cols=[(100,284),(377,561),(653,839),(931,1116),(1210,1393),(1487,1671),(1765,1948)]
rows=[(78,253),(272,453),(467,646),(664,841),(857,1035),(1053,1235),(1246,1429),(1441,1619),(1636,1817),(1830,2012)]
T=128
def tile(r,c):
    y0,y1=rows[r];x0,x1=cols[c];p=14
    y0-=p;y1+=p;x0-=p;x1+=p
    a=A[y0:y1,x0:x1]
    sat=a.max(2)-a.min(2);bri=a.mean(2)
    bgish=(sat<32)&(bri<105)
    lab,n=ndimage.label(bgish)
    border=set(lab[0,:])|set(lab[-1,:])|set(lab[:,0])|set(lab[:,-1]);border.discard(0)
    out=np.isin(lab,list(border))
    fg=~out
    fg=ndimage.binary_opening(fg,iterations=2);fg=ndimage.binary_fill_holes(fg)
    lab2,n2=ndimage.label(fg);
    if n2>1:
        sz=ndimage.sum(fg,lab2,range(1,n2+1));fg=lab2==(1+int(np.argmax(sz)))
    fg=ndimage.binary_erosion(fg,iterations=1)
    ys,xs=np.where(fg);by0,by1,bx0,bx1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
    alpha=Image.fromarray((fg*255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.2))
    rgba=Image.fromarray(a.astype('uint8')).convert('RGBA');rgba.putalpha(alpha)
    rgba=rgba.crop((bx0,by0,bx1,by1)).resize((T,T),Image.LANCZOS)
    return rgba
def hsv(t):return np.asarray(t.convert('RGB').convert('HSV')).astype(float)
def stats(t):
    h=hsv(t);al=np.asarray(t)[...,3]>200;m=al&(h[...,1]>60)
    ang=h[...,0][m]/255*2*np.pi;hue=(np.arctan2(np.sin(ang).mean(),np.cos(ang).mean())/(2*np.pi)*255)%255
    return hue,np.median(h[...,1][m]),np.median(h[...,2][m])
ref=[tile(0,c) for c in range(7)];rs=[stats(t) for t in ref]
def recolor(t,sc,tc):
    h=hsv(t);dh=rs[tc][0]-rs[sc][0];ks=rs[tc][1]/rs[sc][1];kv=rs[tc][2]/rs[sc][2]
    w=np.clip(h[...,1]/60,0,1) # no tocar brillos blancos
    h[...,0]=(h[...,0]+dh)%255;h[...,1]=np.clip(h[...,1]*(1+(ks-1)*w),0,255);h[...,2]=np.clip(h[...,2]*(1+(kv-1)*w),0,255)
    o=Image.fromarray(h.astype('uint8'),'HSV').convert('RGBA');o.putalpha(t.getchannel('A'));return o
def gray(t):
    g=t.convert('L').point(lambda v:int(40+v*.5));o=Image.merge('RGBA',(g,g,g,t.getchannel('A')));return o
full=[0,1,2,3,4,5,6,8,9]
part=[(0,1),(2,3),(4,5),(6,)]
sheet=Image.new('RGBA',(8*T,13*T),(0,0,0,0))
for i,r in enumerate(full):
    for c in range(7):
        t=tile(r,c);sheet.paste(t,(c*T,i*T))
        if c==0:sheet.paste(gray(t),(7*T,i*T))
for j,src in enumerate(part):
    i=9+j;ts={c:tile(7,c) for c in src}
    for c in range(7):
        if c in ts:t=ts[c]
        else:
            sc=min(src,key=lambda s:abs(s-c));t=recolor(ts[sc],sc,c)
        sheet.paste(t,(c*T,i*T))
    sheet.paste(gray(ts[src[0]]),(7*T,i*T))
sheet.save('blocks.webp',quality=84,method=6)
bgim=Image.new('RGBA',sheet.size,(42,10,5,255));bgim.alpha_composite(sheet);bgim.convert('RGB').save('preview.png')
import os;print(os.path.getsize('blocks.webp'))
