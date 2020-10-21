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
    // sort
    int j, m, n, temp;
    for (j=0; j<size; j++){
        for(m=j+1; m<size; m++){
            if (arr[j]>arr[m]){
                temp = arr[m];
                arr[m] = arr[j];
                arr[j] = temp;
            }
        }
    }
    printf("your ordered array is: \n");
    for (n=0; n<size; n++){
        printf( "%d ",arr[n]);
    }
    return 0;
}
