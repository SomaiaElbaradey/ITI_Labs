#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    char fName[10];
    char lName[10];
    char fullName[20];
    printf("please enter your first name \n");
    gets(fName);
    printf("please enter your last name \n");
    gets(lName);
    strcpy(fullName, fName);
    strcat(fullName," ");
    strcat(fullName, lName);
    printf("your full name is: \n")
    puts(fullName);
    return 0;
}
