#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#include <string.h>
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
typedef struct Emp
{
    int age;
    char *name;
    int id;
    float salary;
    float commission;
    float deduction;
}Employee;
int * Line(int size,int xPos, int yPos, int startC, int endC ){
    //system("cls");
    int flag =1;
    char *line;
    line= malloc(size*sizeof(char));
    char *pfirst, *plast, *pcurrent;
    char ch;
    int currentpos, lastpos, firstpos;
    currentpos=firstpos=lastpos=yPos;
    pfirst=plast=pcurrent=line;
    for (int i=0; i<size; i++)
    {
        gotoxy(yPos+i, xPos);
        textattr(23);
        _cprintf(" ");
    }

    do
    {
        gotoxy(currentpos,xPos);
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
                    *pcurrent=*(pcurrent+1);
                    gotoxy(currentpos,xPos);
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
                    lastpos--;
                    plast--;
                }
                break;
            }
            break;
        case esc:
        case enter:
            flag=0;
            plast='\0';
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
                    gotoxy(currentpos,xPos);
                    printf("%c",' ');
                    *pcurrent=' ';
                }
                else
                {
                    //shifting
                    currentpos--;
                    pcurrent--;
                    *pcurrent=*(pcurrent+1);
                    gotoxy(currentpos,xPos);
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
            if(isprint(ch) && ch>startC && ch< endC)
            {
                if(currentpos<firstpos+size)
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
    return line;
}
int main()
{
    Employee emp1;
    //view the fields to get
    gotoxy(10,2);
    printf("id: ");
    gotoxy(50,2);
    printf("name: ");
    gotoxy(10,7);
    printf("age: ");
    gotoxy(50,7);
    printf("salary: ");
    gotoxy(10,12);
    printf("com: ");
    gotoxy(50,12);
    printf("deduct: ");

    //right place and values
    emp1.id= atoi(Line(7,2,15,48,57));
    emp1.name=Line(20,2,57,0,127);
    emp1.age=atoi(Line(3,7,15,48,57));
    emp1.salary=atof(Line(9,7,57,48,57));
    emp1.commission=atof(Line(9,12,15,48,57));
    emp1.deduction=atof(Line(9,12,57,48,57));

    //view employee data
    system("cls");
    printf("the employ name is: %s\n", emp1.name);
    printf("who's id is: %d\n", emp1.id);
    printf("age is: %d\n", emp1.age);
    printf("salary is: %f\n", emp1.salary);
    printf("commission is: %f\n", emp1.commission);
    printf("deduction is: %f\n", emp1.deduction);
    printf("and Net Salary is: %f\n", emp1.commission+emp1.deduction);

    return 0;
}
