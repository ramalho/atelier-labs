
'''
Source for color table:
http://en.wikipedia.org/wiki/Electronic_color_code
'''

COLORS = 'black brown red orange yellow green blue violet gray white'.split()

TOLERANCE = {
    'brown':1, 'red':2, 
    'green':0.5, 'blue':0.25, 'violet':0.1, 'gray':0.05, 
    'gold':5, 'silver':10} #, None:20}

def identify(bands):
    digits = [] 
    for band in bands[:-2]: # all bands except last 2
        digit = COLORS.index(band)
        digits.append(str(digit))
    digits = int(''.join(digits))
    multiplier = COLORS.index(bands[-2]) # the band before last
    value = digits * (10 ** multiplier)
    tolerance = TOLERANCE.get(bands[-1],'unknown color') # last band
    return '%s Ohms, %s%% tolerance' % (value, tolerance)


def self_test():    
    '''
    Source for examples:
    http://www.arar93.dsl.pipex.com/mds975/Content/components01.html
    '''
    # 4 bands
    print identify('brown black brown silver'.split())
    print identify('yellow violet red gold'.split())
    print identify('orange orange yellow silver'.split())
    # 5 bands
    print identify('brown black black black silver'.split())
    print identify('yellow violet black brown gold'.split())
    print identify('orange orange black orange silver'.split())
    
def main():
    from sys import argv

    colors = argv[1:] # skip script name (argv[0])

    if len(colors) in [4,5]:
        print identify(colors)
    else:
        print 'usage:'
        print argv[0], 'color1 color2 color3 color4 [color5]'

if __name__=='__main__': 
    # self_test()
    main()

    
    
    
        
    

