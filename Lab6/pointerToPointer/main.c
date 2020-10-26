#include <stdio.h>
#include <stdlib.h>

int main()
{
    int x;
    int *ptr;
    int **ptrptr;
    ptr=&x;
    ptrptr=&ptr;
    printf("the value of x directry: %i \n",x);
    printf("from the first pointer: %i \n",*ptr);
    printf("the value of x from the pointer to pointer: %i \n", **ptrptr);
    printf("the value of the pointer to x is: %i \n", ptr);
    printf("the value of the pointer to the pointer of x is: %i \n", ptrptr);
    return 0;
}
