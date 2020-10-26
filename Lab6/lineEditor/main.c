#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#define Extended -32
#define left 75
#define right 77
#define home 71
#define end 79
#define enter 13
#define esc 27
#define delete 83 //Extended
#define backSpace 8 //normal
void textattr(int i)
{
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), i);
}
void gotoxy( int column, int line )
{
    COORD coord;
    coord.X = column;
    coord.Y = line;
    SetConsoleCursorPosition(GetStdHandle( STD_OUTPUT_HANDLE ),coord);
}
void swap(char* a, char* b)
{
    char tmp = *a;
    *a = *b;
    *b = tmp;
}
int main()
{
    int flag =1;
    char line[31];
    char *pfirst, *plast, *pcurrent;
    char ch;
    int currentpos, lastpos, firstpos;
    currentpos=firstpos=lastpos=10;
    pfirst=plast=pcurrent=line;
    for (int i=0; i<31; i++)
    {
        gotoxy(10+i, 10);
        textattr(23);
        _cprintf(" ");
    }

    do
    {
        gotoxy(currentpos,10);
        ch=getch();
        switch(ch)
        {
        case Extended:
            ch =getch();
            switch(ch)
            {
            case left:
                if(currentpos>firstpos)
                {
                    currentpos--;
                    pcurrent--;
                }
                break;
            case right:
                if(currentpos<lastpos)
                {
                    currentpos++;
                    pcurrent++;
                }
                break;
            case end:
                currentpos=lastpos;
                pcurrent=plast;
                break;
            case home:
                currentpos=firstpos;
                pcurrent=pfirst;
                break;
            case delete:
                if(currentpos>=firstpos&&currentpos<lastpos)
                {
                    int pos=currentpos;
                    int ptr=pcurrent;
                    pcurrent++;
                    currentpos++;
                    lastpos--;
                    plast--;
                    *pcurrent=*(pcurrent+1);
                    gotoxy(currentpos,10);
                    printf("%c",*pcurrent);
                    //shifting
                    for(int i=0; i<(lastpos-currentpos)+1; i++)
                    {
                        pcurrent++;
                        currentpos++;
                        *pcurrent=*(pcurrent+1);
                        printf("%c",*pcurrent);
                    }
                    currentpos=pos;
                    pcurrent=ptr;
                }
                break;
            }
            break;
        case esc:
        case enter:
            flag=0;
            system("cls");
            printf("%s",line);
            break;
        case backSpace:
            if(currentpos>firstpos)
            {
                if(currentpos==lastpos)
                {
                    currentpos--;
                    pcurrent--;
                    lastpos--;
                    plast--;
                    gotoxy(currentpos,10);
                    printf("%c",' ');
                    *pcurrent=' ';
                }
                else
                {
                    //shifting
                    currentpos--;
                    pcurrent--;
                    *pcurrent=*(pcurrent+1);
                    gotoxy(currentpos,10);
                    printf("%c",*pcurrent);
                    int num = lastpos-currentpos;
                    //printf("%d",num);
                    for(int i=0; i<(lastpos-currentpos)+1; i++)
                    {
                        pcurrent++;
                        currentpos++;
                        *pcurrent=*(pcurrent+1);
                        printf("%c",*pcurrent);
                    }
                    if(num!=0)
                    {
                        currentpos-=num-1;
                        pcurrent-=num-1;
                    }
                }
            }
            break;
        default:
            _flushall();
            if(isprint(ch))
            {
                if(currentpos<firstpos+30)
                {
                    if(currentpos==lastpos)
                    {
                        *pcurrent=ch;
                        printf("%c",ch);
                        pcurrent++;
                        plast++;
                        lastpos++;
                        currentpos++;
                    }
                    else
                    {
                        *pcurrent=ch;
                        printf("%c",ch);
                        currentpos++;
                        pcurrent++;
                    }
                }
            }
            break;
        }
    }
    while(flag==1);
    return 0;
}
