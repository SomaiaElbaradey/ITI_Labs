#include <stdio.h>
#include <stdlib.h>
int main()
{
    int arr1[3][3];
    int arr2[3][2];
    int arr3[3][2];
    for (int i=0; i<3; i++){
        printf("row %i of the first array \n", i+1);
        for(int j=0; j<3; j++){
            printf("please enter your %i column of the row %i \n", j+1, i+1);
            scanf("%d",&arr1[i][j]);
        }
    }
    for (int i=0; i<3; i++){
        printf("row %i of the second array \n", i+1);
        for(int j=0; j<2; j++){
            printf("please enter your %i column of the row %i \n", j+1, i+1);
            scanf("%d",&arr2[i][j]);
        }
    }
    //multiply
    printf("the result is \n");
    for (int x=0; x<2; x++){
        for (int z=0; z<4; z++){
            int i=0;
            int result=0;
            for(int j=0;j<3; j++){
                result+=arr1[z][i]*arr2[j][x];
                i++;
            }
            arr3[z][x]=result;
            printf(" %d ",result);
        }
    }
    return 0;
}
