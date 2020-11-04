#include<stdio.h>
#include<stdlib.h>
int main()
{
    int num;
    int arr[10];
    int i;
    printf("please enter the decimal number \n");
    scanf("%d",&num);
    for(i=0; num>0; i++)
    {
        arr[i]=num%2;
        num/=2;
    }
    printf("the Binary is:");
    for(i=i-1; i>=0; i--)
    {
        printf("%d",arr[i]);
    }
    return 0;
}
