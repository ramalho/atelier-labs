#!/usr/bin/env python
# -*- coding: utf-8 -*-

import Tkinter as Tk
from tkFont import Font
import time
principal = Tk.Tk()
hora = ''
fonte = Font(family='lucida',size=40)
relogio = Tk.Label(principal,font=fonte)
relogio.pack()

def tic( ):
    global hora
    agora = time.strftime('%H:%M:%S')
    if agora != hora:
        hora = agora
        relogio.config(text=hora)
    relogio.after(200, tic)
tic( )
Tk.mainloop( )
