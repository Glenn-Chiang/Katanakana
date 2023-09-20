import json

def main():
    initial_data = None
    kana_list = []

    with open('kana.json', 'r', encoding='utf8') as kana_file:
        initial_data = json.load(kana_file)

    # Combine sublists into one
    for list_key in ['list1', 'list2', 'list3']:
        sublist = initial_data[list_key]
        kana_list.extend(sublist)

    kana_list = [kana for kana in kana_list if not kana['id']
                 == 'x']  # Remove invalid entries

    # Create separate lists for hiragana and katakana
    hiragana_list = [{'id': kana['id'], 'kana': kana['hiragana']}
                     for kana in kana_list]
    katakana_list = [{'id': kana['id'], 'kana': kana['katakana']}
                     for kana in kana_list]

    with open('kana.json', 'w', encoding='utf8') as kana_file:
        json.dump(kana_list, kana_file, ensure_ascii=False)
    with open('hiragana.json', 'w', encoding='utf8') as hiragana_file:
        json.dump(hiragana_list, hiragana_file, ensure_ascii=False)
    with open('katakana.json', 'w', encoding='utf8') as katakana_file:
        json.dump(katakana_list, katakana_file, ensure_ascii=False)


if __name__ == '__main__':
    main()
