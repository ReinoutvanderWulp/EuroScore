CREATE TABLE IF NOT EXISTS participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country TEXT NOT NULL,
    flag_url TEXT,
    artist TEXT NOT NULL,
    song TEXT NOT NULL,
    returning_artist BOOLEAN DEFAULT FALSE,
    spotify_url TEXT,
    country_wins INT,
    genre TEXT
    );

CREATE TABLE IF NOT EXISTS ranking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id UUID REFERENCES participants(id) ON DELETE CASCADE,
    points INT
    );
