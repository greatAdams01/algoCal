
export interface ICreateEvent {
  title: string;
  date: string;
  organizer: string;
  time: string;
  description: string;
  venue: string;
  category: string;
  link: string;
}

export interface UserCreator {
	_id: string,
	about: string,
	email: string,
	name: string,
	website: string
}