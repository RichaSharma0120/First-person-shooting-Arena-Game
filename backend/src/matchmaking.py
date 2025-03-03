class Matchmaking:
    def __init__(self):
        self.players = []
        self.matches = []

    def add_player(self, player_id):
        self.players.append(player_id)
        self.match_players()

    def remove_player(self, player_id):
        if player_id in self.players:
            self.players.remove(player_id)

    def match_players(self):
        while len(self.players) >= 2:
            player1 = self.players.pop(0)
            player2 = self.players.pop(0)
            self.create_match(player1, player2)

    def create_match(self, player1, player2):
        match_id = len(self.matches) + 1
        self.matches.append({
            'match_id': match_id,
            'players': [player1, player2],
            'status': 'waiting'
        })

    def get_matches(self):
        return self.matches

    def get_players(self):
        return self.players