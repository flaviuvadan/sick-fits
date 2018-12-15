function Person(name, age) {
	this.name = name;
	this.age = age;
}

Person.prototype.getAge = function() {
	// simulates an API
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(this.age), 1000);
	});
};

describe('mock learning', () => {
	it('mocks a reg function', () => {
		const fetchData = jest.fn();
		fetchData('options');
		expect(fetchData).toHaveBeenCalled();
		expect(fetchData).toHaveBeenCalledWith('options');
		expect(fetchData).toHaveBeenCalledTimes(1);
	});

	it('can create a person', () => {
		const person = new Person('Starman', 42);
		expect(person.name).toEqual('Starman');
	});

	it('can get age', () => {
		const person = new Person('Starman', 42);
		// mock getAge
		person.getAge = jest.fn().mockResolvedValue(42);
		//could also .then on getAge()
		expect(person.getAge()).resolves.toEqual(42);
	});
});

