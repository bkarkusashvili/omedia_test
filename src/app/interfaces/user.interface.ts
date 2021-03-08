import { Organization } from './organization.interface';
import { Repository } from './repository.interface';

export interface Users {
    total_count: number;
    incomplete_results: boolean;
    items: User[];
}

export interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    score: number;
}

export interface UserFull extends User {
    name: string;
    company?: any;
    blog: string;
    location?: any;
    email?: any;
    hireable?: any;
    bio?: any;
    twitter_username?: any;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export interface UserWithRepo extends UserFull {
    repos: Repository[];
    orgs: Organization[];
}

export interface Filter {
    q: string;
    page?: number;
    per_page?: number;
    sort?: string;
    order?: string;
}
