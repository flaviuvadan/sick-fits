describe('sample test suite', () => {
	it('should recognize integers as equal', () => {
		expect(1).toEqual(1);
	});

	it('should recognize booleans as truthy', () => {
		expect(true).toBeTruthy();
	});

	it('should recognize integers as not equal', () => {
		expect(1).not.toEqual(2);
	});
});