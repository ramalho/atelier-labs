#!/usr/bin/env python
# -*- coding: utf-8 -*-

import Tkinter as tk
from random import choice

##################################### tratamento de eventos
CORES = {0:'#800000', 1:'#FFFF00'}

REGRA = {'1':'1245',  '2':'123',   '3':'2356',  # 1 2 3
         '4':'147',   '5':'24568', '6':'369',   # 4 5 6
         '7':'4578',  '8':'789',   '9':'5689'}  # 7 8 9

FINAL = '111'+'101'+'111'

def estado(idBt):
    if bts[idBt].cget('bg') == CORES[0]:
        return 0
    else:
        return 1

def estadoGeral():
    estados = []
    for idBt in sorted(bts.keys()):
        estados.append(str(estado(idBt)))
    return ''.join(estados)

def alternar(idBt):
    if estado(idBt) == 0:
        cor = CORES[1]
    else:
        cor = CORES[0]
    bts[idBt].configure(bg=cor, activebackground=cor)

def clique(evento):
    btClique = evento.widget.winfo_name()
    for bt in REGRA[btClique]:
        alternar(bt)
    if estadoGeral() == FINAL:
        comemorar()

vezes = 0
def sortear():
    global vezes
    if vezes < 10:
        bt = choice(bts.keys())
        alternar(bt)
        vezes += 1
        janela.after(100,sortear)
    else:
        vezes = 0

def comemorar():
    global vezes
    if vezes < 6:
        for bt in sorted(bts.keys()):
            alternar(str(bt))
        vezes += 1
        janela.after(150, comemorar)
    else:
        vezes = 0
##################################### montagem da janela

janela = tk.Tk()

# criar painel
painel = tk.Frame(janela,bg='#000000')
painel.pack(side=tk.TOP)

# criar botões
bts = {}
for i in range(3):
    for j in range(3):
        idBotao = str(i*3+j+1)
        bt = tk.Button(painel,name=idBotao,bg=CORES[0],activebackground=CORES[0],width=10,height=6)
        bt.bind('<Button-1>',clique)
        bt.grid(row=i,column=j)
        bts[idBotao] = bt

for item in sorted(bts['1'].configure()):
    print item

# criar botao Sortear
tk.Button(janela, text='Sortear', command=sortear).pack(side=tk.BOTTOM)

# Sortear posicao inicial
sortear()

janela.mainloop()
