#include <stdio.h>
#include <stdlib.h>
int main()
{
    // get the array values
    int size, i;
    printf("please enter your array size \n");
    scanf("%d",&size);
    int arr[size];
    for (i=0; i<size; i++){
        printf("please enter your %i number of the array \n", i+1);
        scanf("%d",&arr[i]);
    }
    // get the max
    int max = arr[0] , j;
    for (j=1; j<size; j++){
        if (arr[j] > max){
            max = arr[j];
        }
    }
    printf("the max number in your array is %d",max);
    return 0;
}
