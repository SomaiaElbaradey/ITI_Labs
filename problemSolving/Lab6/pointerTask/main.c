#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
int main()
{
    int arr[5];
    int *ptr;
    ptr=arr;
    for (int i=0; i<5; i++,ptr++){
        printf("enter your %d number \n",i+1);
        scanf("%i",ptr);
    }
    system("cls");
    ptr = arr;
    for (int i=0; i<5; i++){
        printf("your %d number is %d \n", i+1, *ptr);
        ptr++;
    }
    return 0;
}
