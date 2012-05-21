#!/usr/bin/env python
# -*- coding: utf-8 -*-

import Tkinter as tk
from tkFont import Font

from resistor import COLORS

janela = tk.Tk()

NOMES_PARTES = 't1 0 1 2 3 4 5 6 7 8 9 nada Au Ag t2'.split()

# carregar imagens das partes
partes = {}
for nome in NOMES_PARTES:
    parte = tk.PhotoImage(file='img/%s.gif'% nome)
    partes[nome] = parte
    print nome, parte.width()

aneis_valor = [1,0,0,0]
anel_tolerancia = 'Ag'

PARTES_RESISTOR = ['t1'] + [str(x) for x in aneis_valor] + ['nada', anel_tolerancia, 't2']

def mudarValor(anel,delta,botao):
    print 'mudar valor', delta
    indice = anel - 1 # lista anel_valor comeca em 0
    valor = aneis_valor[indice]
    novo_valor = valor + delta
    if anel == 1: minimo = 1
    else: minimo = 0
    if novo_valor < minimo: novo_valor = 9
    elif novo_valor > 9: novo_valor = minimo
    aneis_valor[indice] = novo_valor
    botao.configure(image=partes[str(novo_valor)])

def clique(evento):
    anel = evento.widget.winfo_name()
    anel = int(anel[-1])
    if evento.num in (1,4): delta = 1 
    elif evento.num in (3,5): delta = -1
    else: 
        print 'bt?:', evento.num
        return
    if anel in [1,2,3,4]:
        mudarValor(anel,delta,evento.widget)
    elif anel == 6:
        print 'mudar tolerancia', delta

def roda(evento):
    print 'roda:',evento.num


msg = '''Clique nas faixas para mudar a cor.
Experimente botões esquerdo, direito e rodinha.'''
ajuda = tk.Label(janela, text=msg)
ajuda.pack(side=tk.TOP)

figura = tk.Frame(janela,width=600,height=160,bg='#7F7F7F')
figura.pack(side=tk.TOP,padx=10,pady=10)        

# criar botões com partes
for numero, nome in enumerate(PARTES_RESISTOR):
    nomeBotao = 'anel' + str(numero)
    btParte = tk.Button(figura,name=nomeBotao,image=partes[nome],
        relief=tk.FLAT,borderwidth=0,highlightthickness=0)
    btParte.config(width=partes[nome].width()-2)
    for i in [1,3,4,5]:
        btParte.bind('<Button-%s>' % i,clique)
    btParte.pack(side=tk.LEFT,padx=0)

fonte = Font(family='lucida',size=18)
msg = '1000 Ohms; 10% de tolerância'
valor = tk.Label(janela, text=msg, font=fonte)
valor.pack(side=tk.BOTTOM)   

janela.mainloop()
