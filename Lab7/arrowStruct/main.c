#include <stdio.h>
#include <stdlib.h>

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
    Employee emp;
    Employee *ptr=&emp;
    printf("Please enter the employee ID:\n");
    scanf("%d",&ptr->id);
    printf("Please enter the employee Name:\n");
    _flushall();
    scanf("%s",&ptr->name);
    printf("Please enter the employee Age:\n");
    _flushall();
    scanf("%d",&ptr->age);
    printf("Please enter the employee Salary:\n");
    _flushall();
    scanf("%f",&ptr->salary);
    printf("Please enter the employee Commission:\n");
    _flushall();
    scanf("%f",&ptr->commission);
    printf("Please enter the employee Deduction:\n");
    _flushall();
    scanf("%f",&ptr->deduction);
    system("cls");
    printf("The Employee ID is: %d\n",ptr->id);
    printf("The Employee Name is: %s\n",ptr->name);
    printf("The Employee Age is: %d\n",ptr->age);
    printf("The Employee Salary is: %f\n",ptr->salary);
    printf("The Employee Commission is: %f\n",ptr->commission);
    printf("The Employee Deduction is: %f\n",ptr->deduction);

    return 0;
}
