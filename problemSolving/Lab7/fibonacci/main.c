#include <stdio.h>
#include <stdlib.h>
int fibonacci(int num){
    if(num==0){
        return 0;
    }
    else if(num==1){
        return 1;
    }
    else{
        return fibonacci(num-1)+fibonacci(num-2);
    }
}
int main()
{
    int x;
    printf("please enter your index of Fibonacci \n");
    scanf("%d",&x);
    for(int i=0; i<x; i++){
        printf("%d",fibonacci(i));
    }
    return 0;
}
