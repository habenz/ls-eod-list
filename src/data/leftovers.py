import json

items = []
with open("raw.txt", encoding="utf-8-sig") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue

        if "-" == line[0] and ":" in line:
            short_name, short_type_names = line.split(":")
            curr_item["short_name"] = short_name.lstrip("-").strip()
            short_type_names = short_type_names.split(",")
            types = []
            for short, name in zip(short_type_names, type_names):
                types.append({"name": name.strip(), "short_name": short.strip()})
            curr_item["types"] = types
            items.append(curr_item)
        elif ":" in line:
            curr_item = {}
            name, type_names = line.split(":")
            curr_item["name"] = name.strip()
            type_names = type_names.split(", ")
        elif "-" == line[0]:
            curr_item["short_name"] = line.lstrip("-").strip()
            items.append(curr_item)
        else:
            curr_item = {}
            curr_item["name"] = line

with open("leftoverItems.json", "w") as f:
    json.dump(items, f, indent=2)
