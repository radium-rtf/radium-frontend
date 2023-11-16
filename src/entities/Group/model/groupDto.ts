export interface GroupDto {
    id:         string;
    name:       string;
    inviteCode: string;
    courses:    Course[];
    students:   Student[];
}

export interface Course {
    id:               string;
    name:             string;
    slug:             string;
    shortDescription: string;
    description:      string;
    logo:             string;
    banner:           string;
    authors:          Author[];
    links:            string[];
    score:            number;
    maxScore:         number;
    modules:          Module[];
}

export interface Author {}

export interface Module {}

export interface Student {
    id:     string;
    email:  string;
    name:   string;
    avatar: string;
    roles:  Role;
}

export interface Role {}