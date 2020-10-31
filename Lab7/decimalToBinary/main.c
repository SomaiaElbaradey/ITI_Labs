#include <stdio.h>
#include <stdlib.h>

int binary(int n){
   if (n == 0){
       return 0;
   }    
   else{
       return n % 2 + 10 * (binary(n /2));
   }
}

int main()
{
    int arr[10];
    int x;
    printf("please enter your decimal number \n");
    scanf("%d",&x);
    printf("the binary number is: %d", binary(x));
    return 0;
}

