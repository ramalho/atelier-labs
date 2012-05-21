# -*- coding: utf-8 -*-

import Tkinter as tk
import sys

def clique():
    print 'olá'


janela = tk.Tk()

bt = tk.Button(text='oi',command=clique)
bt.pack()

tk.Button(text='Tchau!', command=sys.exit).pack()


janela.mainloop()
