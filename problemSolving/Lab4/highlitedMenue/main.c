#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#define Extended -32
#define up 72
#define down 80
#define home 71
#define end 79
#define enter 13
#define esc 27
#define tab 9

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
    int flag=1;
    char menue[3][10] = {"New","Display","Exit"};
    int cursor =0;
    char ch;
    do
    {
        system("cls");
        for(int i=0; i<3; i++)
        {
            if (i==cursor)
            {
                textattr(3);
            }
            else
            {
                textattr(8);
            }
            gotoxy(10,10+i*3);
            _cprintf("%s",menue[i]);
        }
        _flushall();
        ch=getch();
        switch (ch)
        {
        //extended cases
        case Extended:
            ch=getch();
            switch (ch)
            {
            case up:
                cursor--;
                if(cursor<0){
                    cursor=2;
                }
                break;
            case down:
                cursor++;
                if(cursor>2){
                    cursor=0;
                }
                break;
            case home:
                cursor=0;
                break;
            case end:
                cursor=2;
                break;
            }
            break;
        //normal cases
        case enter:
            switch (cursor)
            {
            case 0:
                system("cls");
                printf("New Page \n");
                getch();
                break;
            case 1:
                system("cls");
                printf("Display Page");
                getch();
                break;
            case 2:
                flag=0;
                break;
            }
            break;
        case esc:
            flag=0;
            break;
        case tab:
            cursor++;
            if(cursor>2){
                cursor=0;
            }
            break;
        }
    } while(flag==1);
    return 0;
}
