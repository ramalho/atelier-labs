#!/usr/bin/env python
# -*- coding: utf-8 -*-

import Tkinter as Tk
import time
hora = ''
relogio = Tk.Label( )
relogio.pack( )

def tic( ):
    global hora
    agora = time.strftime('%H:%M:%S')
    if agora != hora:
        hora = agora
        relogio.config(text=hora)
    relogio.after(200, tic)
tic( )
Tk.mainloop( )
