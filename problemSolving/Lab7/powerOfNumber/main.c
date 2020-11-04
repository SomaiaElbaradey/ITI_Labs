#include <stdio.h>
#include <stdlib.h>
int power(int num, int p){
    if(p==0){
        return 1;
    }
    else{
        return num * power(num, p-1);
    }
}
int main()
{
    printf("please enter your number: \n");
    int x;
    scanf("%d", &x);
    printf("please enter the power to your number: \n");
    int pow;
    scanf("%d", &pow);
    printf("the result is: %d", power(x,pow));
    return 0;
}
