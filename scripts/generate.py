import json
import os

# 读取 movies.json
with open("data/movies.json", "r", encoding="utf-8") as file:
    movies = json.load(file)

# 遍历 episodes 目录
episodes_dir = "data/episodes"
for movie in movies:
    movie_id = movie["id"]
    episodes_file = os.path.join(episodes_dir, f"{movie_id}.txt")
    
    if os.path.exists(episodes_file):
        with open(episodes_file, "r", encoding="utf-8") as file:
            lines = file.readlines()
        
        # 解析剧集
        movie["episodes"] = [{"name": line.split("$")[0].strip(), "url": line.split("$")[1].strip()} for line in lines if "$" in line]
    else:
        movie["episodes"] = []

# 写回 movies.json
with open("data/movies.json", "w", encoding="utf-8") as file:
    json.dump(movies, file, indent=4, ensure_ascii=False)

print("movies.json 更新完成！")