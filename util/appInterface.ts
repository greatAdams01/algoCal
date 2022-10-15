
export interface ICreateEvent {
  title: string;
  date: string;
  time: string;
  description: string;
  venue: string;
  category: string;
  link: string;
}
export interface IEvent {
  description: string;
  date: string;
  category: string;
  followers: string;
  link: string;
  organizer: string;
  reactions: string;
  time: string;
  title: string;
  updatedAt: string;
  venue: string;
  image: string;
}

export interface UserCreator {
	_id: string,
	about: string,
	email: string,
	name: string,
	website: string
}