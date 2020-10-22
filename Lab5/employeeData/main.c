#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
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
}Employee;
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
    //get the data from user
    gotoxy(14,2);
    scanf("%i",&emp1.id);
    _flushall();
    gotoxy(57,2);
    scanf("%s",emp1.name);
    _flushall();
    gotoxy(14,7);
    scanf("%d",&emp1.age);
    _flushall();
    gotoxy(57,7);
    scanf("%f",&emp1.salary);
    _flushall();
    gotoxy(14,12);
    scanf("%f",&emp1.commission);
    _flushall();
    gotoxy(57,12);
    scanf("%f",&emp1.deduction);
    _flushall();
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
