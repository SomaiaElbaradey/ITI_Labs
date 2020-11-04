#include <stdio.h>
#include <stdlib.h>
int factorial(int num){
    if (num == 1){
        return 1;
    } else{
        return num * factorial(num-1);
    }
}
int main()
{
    printf("please enter your number: \n");
    int x;
    scanf("%d", &x);
    printf("the factorial is: %d", factorial(x));
    return 0;
}
