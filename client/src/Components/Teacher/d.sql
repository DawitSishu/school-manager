UPDATE students
SET report_card = JSON_OBJECT(
    'class', '6B',
    'year', '2015-2023/2024',
    'semester_1', JSON_OBJECT(
        'Amharic', 0,
        'English', 0,
        'Environmental Science', 0,
        'Moral Education', 0,
        'Mathematics', 0,
        'Visual Art', 0,
        'IT',0,
        'Total', 0,
        'Average', 0,
        'Rank', 0
    ),
    'semester_2', JSON_OBJECT(
     'Amharic', 0,
        'English', 0,
        'Environmental Science', 0,
        'Moral Education', 0,
        'Mathematics', 0,
        'Visual Art', 0,
        'Total', 0,
        'Average', 0,
        'Rank', 0),
    'semester_3', JSON_OBJECT(
     'Amharic', 0,
        'English', 0,
        'Environmental Science', 0,
        'Moral Education', 0,
        'Mathematics', 0,
        'Visual Art', 0,
        'Total', 0,
        'Average', 0,
        'Rank', 0),
    'semester_4', JSON_OBJECT(
     'Amharic', 0,
        'English', 0,
        'Environmental Science', 0,
        'Moral Education', 0,
        'Mathematics', 0,
        'Visual Art', 0,
        'Total', 0,
        'Average', 0,
        'Rank', 0),
        'Average', JSON_OBJECT(
     'Amharic', 0,
        'English', 0,
        'Environmental Science', 0,
        'Moral Education', 0,
        'Mathematics', 0,
        'Visual Art', 0,
        'Total', 0,
        'Average', 0,
        'Rank', 0)
)
WHERE class_id = 47;
