## Test task:
Given a marketplace - https://giftly.klickly-dev.com/marketplace
Goal - automate 3 test cases in the way of a real project having all attributes for further auto-tests expansion.
## Test cases:
1. Via the search text field find a product (can be used any name on your choice) by a specific title and check that it's openable.

- Should be UI based.

2. Input & submit "STAR WARS" (can be used any name on your choice) in the search text field and check that the result contains 2 arbitrary (defined by you) products containing "STAR WARS" words in the end and on the beginning of the returned list of products

- Emulate a failure for your test where any of these 2 products is not found in the end of test with an informative error message containing the list of the not found products. 
- Use the fastest way (In your opinion) to conduct this assertion

3. Assert that all products on the first page are different from the products on the second page of pagination.
	
- The scrolling is happening on UI
- Use the fastest way (In your opinion) to conduct this assertion

