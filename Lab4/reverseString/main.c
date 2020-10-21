#include <stdio.h>
#include <stdlib.h>

int main()
{
    char msg[50];
    int counter=0;
    printf("please enter your message \n");
    gets(msg);
    do
    {
        counter++;
    }
    while(msg[counter]!='\0');

    for(int i=counter-1; i>=0; i--)
    {
        printf("%c", msg[i]);
    }
    return 0;
}
