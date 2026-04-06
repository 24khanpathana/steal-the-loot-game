#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Helper function to find the maximum of two integers
int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    clock_t start = clock();

    int capacity, num_items;
    // Read capacity and number of items from the first line of stdin
    scanf("%d %d", &capacity, &num_items);

    if (num_items <= 0 || capacity <= 0) {
        printf("{\"maxValue\":0,\"selectedItemsIndices\":[],\"executionTime\":0.0}\n");
        return 0;
    }

    // Dynamically allocate memory for items
    int *values = (int *)malloc(num_items * sizeof(int));
    int *weights = (int *)malloc(num_items * sizeof(int));

    for (int i = 0; i < num_items; i++) {
        // Read value and weight for each item from stdin
        scanf("%d %d", &values[i], &weights[i]);
    }

    // Allocate memory for the DP table
    int **dp = (int **)malloc((num_items + 1) * sizeof(int *));
    for (int i = 0; i <= num_items; i++) {
        dp[i] = (int *)malloc((capacity + 1) * sizeof(int));
    }

    // Build DP table in bottom-up manner
    for (int i = 0; i <= num_items; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) {
                dp[i][w] = 0;
            } else if (weights[i - 1] <= w) {
                dp[i][w] = max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    int max_value = dp[num_items][capacity];

    // Find which items are selected by backtracking
    int *selected_items = (int *)calloc(num_items, sizeof(int));
    int res = max_value;
    int w = capacity;
    for (int i = num_items; i > 0 && res > 0; i--) {
        if (res != dp[i - 1][w]) {
            selected_items[i - 1] = 1; // Mark item as selected
            res -= values[i - 1];
            w -= weights[i - 1];
        }
    }

    clock_t end = clock();
    double time_spent = ((double)(end - start) / CLOCKS_PER_SEC) * 1000; // time in milliseconds

    // Print result as JSON to stdout
    printf("{\"maxValue\":%d, \"selectedItemsIndices\":[", max_value);
    int first = 1;
    for (int i = 0; i < num_items; i++) {
        if (selected_items[i]) {
            if (!first) {
                printf(",");
            }
            printf("%d", i);
            first = 0;
        }
    }
    printf("],\"executionTime\":%.4f}\n", time_spent);

    // Free all dynamically allocated memory
    free(values);
    free(weights);
    for (int i = 0; i <= num_items; i++) {
        free(dp[i]);
    }
    free(dp);
    free(selected_items);

    return 0;
}