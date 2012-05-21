from Tkinter import *

import Image, ImageDraw, ImageTk

import time

class Test(Frame):
    def __init__(self):
        Frame.__init__(self)
        self.c = Canvas(self,width=100,height=100)
        self.c.pack()
        Button(self, text='Go', command=self.do).pack()
        Button(self, text='Quit', command=self.quit).pack()

    def do(self): 
        t = time.time()
        im = Image.new("1", (100,100))
        d  = ImageDraw.ImageDraw(im)
        for i in range(0,100):
            for j in range(0,100):
                d.point((i,j))
        self.photo = ImageTk.BitmapImage(im)
        self.c.create_image(0, 0, anchor=NW, image=self.photo)
        self.update()
        print time.time() - t

t = Test()
t.pack() # or place, or grid
t.mainloop()
