export interface IUserInfoProps {}

export interface IUserFormData {
	ID: number;
	FirstName: string;
	LastName: string;
	Email: string;
	PhoneNumber: string;
	Country: string;
	City: string;
	State: string;
	PostalCode: string;
	DateOfBirth: Date | undefined;
	Gender?: string | undefined;
	AboutYou: string;
}
