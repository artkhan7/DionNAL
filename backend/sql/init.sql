CREATE TABLE IF NOT EXISTS country (
    id integer primary key autoincrement,
    code text,
    phone_code integer,
    name text
);

CREATE TABLE IF NOT EXISTS phone (
    id integer primary key autoincrement,
    phone_number text not null unique,
    is_active integer not null default 1,
    country_id integer,
    foreign key (country_id) references country (id)
);

CREATE TABLE IF NOT EXISTS message (
    id integer primary key autoincrement,
    phone_id integer not null,
    date datetime,
    special_id integer,
    message_text text,
    foreign key (phone_id) references phone (id)
);
