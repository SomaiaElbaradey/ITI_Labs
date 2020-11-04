#include <stdio.h>
#include <stdlib.h>

int main()
{
    int arr1[3][2];
    int arr2[2][1];
    int arr3[3][1];
    for (int i=0; i<3; i++){
        printf("row %i of the first array \n", i+1);
        for(int j=0; j<2; j++){
            printf("please enter your %i column of the row %i \n", j+1, i+1);
            scanf("%d",&arr1[i][j]);
        }
    }
    for (int i=0; i<2; i++){
        printf("row %i of the seconf array \n", i+1);
        for(int j=0; j<1; j++){
            printf("please enter your %i column of the row %i \n", j+1, i+1);
            scanf("%d",&arr2[i][j]);
        }
    }

    //multiply
    printf("the result is \n");
    for (int z=0; z<3; z++){
        int i=0;
        int result=0;
        for(int j=0;j<2; j++){
            result+=arr1[z][i]*arr2[j][0];
            i++;
        }
            arr3[z][0]=result;
            printf(" %d ",arr3[z][0]);
    }

    return 0;
}
