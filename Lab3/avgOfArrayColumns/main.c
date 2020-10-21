#include <stdio.h>
#include <stdlib.h>

int main()
{
    //getting avg of array's columns
    int row, col, i, j, z, y;
    printf("please enter your array's row size \n");
    scanf("%d",&row);
    printf("please enter your array's column size \n");
    scanf("%d",&col);
    int arr[row][col];
    float avg[col];
    for (i=0; i<row; i++){
        printf("row %i of the array \n", i+1);
        for(j=0; j<col; j++){
            printf("please enter your %i column of the row %i \n", j+1, i+1);
            scanf("%d",&arr[i][j]);
        }
    }
    for (z=0; z<col; z++){
        for(y=0; y<row; y++){
            avg[z]+=arr[y][z];
        }
        avg[z]/=row;
    }
    for (int i=0; i<col; i++){
        printf("the avg of the column %i is %f \n", i+1, avg[i]);
    }
    return 0;
}
