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
int main()
{
    int flag =1;
    char line[31];
    char pfirst, plast, pcurrent;
    char ch;
    int currentpos, lastpos, firstpos;
    currentpos=firstpos=lastpos=10;
    pfirst=plast=pcurrent;
    for (int i=0; i<31; i++){
        gotoxy(10+i, 10);
        textattr(23);
        _cprintf(" ");
    }
    do{
        gotoxy(currentpos,10);
        ch=getch();
        switch(ch){
        case Extended:
            ch =getch();
            switch(ch){
            case left:
                if(currentpos>firstpos){
                    currentpos--;
                    pcurrent--;
                }
                break;
            case right:
                if(currentpos<lastpos){
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
            break;
        default:
            if(isprint(ch)){
                if(currentpos<firstpos+30){
                    if(pcurrent==plast){
                        *pcurrent=ch;
                        printf("%c",ch);
                        pcurrent++; plast++; lastpos++; currentpos++;
                    } else{
                        *pcurrent
                    }
                }
            }
            break;
        }
    }while(flag==1);
    return 0;
}
