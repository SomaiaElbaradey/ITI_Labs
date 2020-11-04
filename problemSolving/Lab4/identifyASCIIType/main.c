#include <stdio.h>
#include <stdlib.h>
#define NULL -32

int main()
{
    char ch;
    printf("please enter your character \n");
    ch=getch();
    printf("%c \n",ch);
    switch(ch)
    {
    case NULL:
        printf("You entered an Extended key, ");
        ch=getch();
        printf("its ASCII after null byte is: %d",ch);
        break;

    default:
        printf("you entered a Normal Key, its ASCII is: %d \n", ch);
        break;
    }

    return 0;
}
