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
typedef struct Emp
{
    int age;
    char name[10];
    int id;
    float salary;
    float commission;
    float deduction;
} Employee;
int main()
{
    int num;
    int empIndex;
    Employee emp1[10];
    int flag=1;
    char menue[6][20] = {"New","Display by index","Display All","Delete by index","Delete All","Exit"};
    int cursor =0;
    char ch;
    for(int i=0; i<10; i++){
        emp1[i].id = NULL;
    }
    do
    {
        system("cls");

        for(int i=0; i<6; i++)
        {
            if (i==cursor)
            {
                textattr(3);
            }
            else
            {
                textattr(8);
            }
            gotoxy(10,i*3+2);
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
                if(cursor<0)
                {
                    cursor=5;
                }
                break;
            case down:
                cursor++;
                if(cursor>5)
                {
                    cursor=0;
                }
                break;
            case home:
                cursor=0;
                break;
            case end:
                cursor=5;
                break;
            }
            break;
        //normal cases
        case enter:
            switch (cursor)
            {
            case 0:
                system("cls");
                printf("please enter your employee index \n");
                _flushall();
                scanf("%i",&empIndex);
                if (empIndex>10||empIndex<1)
                {
                    printf("your employee index doesn't exist \n");
                    getch();
                }
                else
                {
                    printf("press any key to enter your %i employee data",empIndex);
                    getch();
                    system("cls");
                    num = empIndex-1;
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
                    //get the data from user
                    gotoxy(14,2);
                    scanf("%d",&emp1[num].id);
                    _flushall();
                    gotoxy(57,2);
                    scanf("%s",emp1[num].name);
                    _flushall();
                    gotoxy(14,7);
                    scanf("%d",&emp1[num].age);
                    _flushall();
                    gotoxy(57,7);
                    scanf("%f",&emp1[num].salary);
                    _flushall();
                    gotoxy(14,12);
                    scanf("%f",&emp1[num].commission);
                    _flushall();
                    gotoxy(57,12);
                    scanf("%f",&emp1[num].deduction);
                    _flushall();
                }
                break;
            case 1:
                //display by index
                system("cls");
                printf("please enter your employee index you wanna show \n");
                _flushall();
                scanf("%i",&empIndex);
                printf("press any key to show your %i employee data",empIndex);
                getch();
                _flushall();
                system("cls");
                num = empIndex-1;
                if (emp1[num].id!=NULL)
                {
                    //view employee data
                    textattr(5);
                    printf("your number %i employee data:\n", empIndex);
                    textattr(3);
                    printf("the employ name is: %s\n", emp1[num].name);
                    printf("who's id is: %d,\n", emp1[num].id);
                    printf("age is: %d,\n", emp1[num].age);
                    printf("salary is: %f,\n", emp1[num].salary);
                    printf("commission is: %f,\n", emp1[num].commission);
                    printf("deduction is: %f,\n", emp1[num].deduction);
                    printf("and Net Salary is: %f.\n", emp1[num].commission+emp1[num].deduction);
                    getchar();
                }
                else
                {
                    printf("there's no data for your %i employee",empIndex);
                    getchar();
                }
                break;
            case 2:
                //display all
                system("cls");
                 for (int i=0; i<10; i++)
                {
                    if (emp1[i].id!=NULL)
                    {
                        //view employee data
                        textattr(5);
                        printf("your number %i employee data:\n", i+1);
                        textattr(3);
                        printf("the employ name is: %s\n", emp1[i].name);
                        printf("who's id is: %d,\n", emp1[i].id);
                        printf("age is: %d,\n", emp1[i].age);
                        printf("salary is: %f,\n", emp1[i].salary);
                        printf("commission is: %f,\n", emp1[i].commission);
                        printf("deduction is: %f,\n", emp1[i].deduction);
                        printf("and Net Salary is: %f.\n\n", emp1[i].commission+emp1[i].deduction);
                    } else {
                        printf("there's no data for employee number %d \n", i+1);
                    }
                }
                getchar();
                break;
            case 3:
                //delete by index
                system("cls");
                printf("please enter your employee index you wanna delete \n");
                scanf("%i",&empIndex);
                printf("press any key to delete your number %i employee data",empIndex);
                getch();
                _flushall();
                system("cls");
                num= empIndex-1;
                if (empIndex>10||empIndex<1)
                {
                    printf("your employee index doesn't exist \n");
                }
                for (int i=0; i<10; i++)
                {
                    if (i==num)
                    {
                        //delete this employee data
                        emp1[i].id=NULL;
                        printf("your employee data was deleted successfuly! \n");
                    }
                }
                getchar();
                break;
            case 4:
                system("cls");
                //dalete all!
                for(int i=0; i<10; i++){
                    emp1[i].id=NULL;
                }
                printf("All the data was deleted successfully!");
                getch();
                break;
            case 5:
                flag=0;
                break;
            }
            break;
        case esc:
            flag=0;
            break;
        case tab:
            cursor++;
            if(cursor>5)
            {
                cursor=0;
            }
            break;
        }
    }
    while(flag==1);
    return 0;
}
