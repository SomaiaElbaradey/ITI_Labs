#include <stdio.h>
#include <stdlib.h>

int main()
{
    // Taking value from the user and present it
    char firstChar;
    printf("please enter the first letter of your name \n");
    scanf("%c",&firstChar);
    printf("your name starts with %c",firstChar);

    return 0;
}
