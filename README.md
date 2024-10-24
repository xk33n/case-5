Кейс-задача № 5

Разработка веб-приложения для учета расходов и доходов:
1. Разработайте веб-приложение для учета ежедневных расходов и доходов пользователя. Добавьте возможность ввода и категоризации транзакций (например, продукты, развлечения, зарплата и т. д.);
2. Разработайте интерфейс для отображения общего баланса и статистики финансов. Реализуйте графики и диаграммы, отображающие структуру расходов и доходов;
3. Добавьте функциональность импорта и экспорта данных для удобства анализа;
4. Реализуйте аутентификацию пользователей и возможность сохранения данных в их личных профилях;
5. Опишите подробный анализ по выполненной задаче (не менее 7 пунктов);
6. Опишите рекомендации по устранению выявленных ошибок в ходе выполнения задачи.

Опишите подробный анализ по выполненнной задаче (не менее 7 пунктов):
1. Реализована базовая функциональность:
- Разработано базовое веб-приложение, включающее в себя форму для ввода транзакций, список транзакций и отображение общего баланса;
- Использованы стандартные технологии веб-разработки: HTML, CSS и JavaScript;
- Основной акцент сделан на простоте и доступности интерфейса для конечного пользователя.
2. Аутентификация и персонализация:
- Реализован механизм аутентификации пользователей с использованием локального хранилища (localStorage), что позволяет пользователям регистрироваться и входить под своими учетными записями;
- Данные пользователя сохраняются индивидуально, обеспечивая персонализацию опыта использования приложения;
- Использование localStorage упрощает разработку и тестирование, однако в реальных проектах рекомендуется применять серверные решения для обеспечения безопасности данных.
3. Графическое представление данных:
- Интегрирована библиотека Chart.js для визуализации финансовой информации в виде графиков и диаграмм;
- Пользователи могут видеть структуру своих расходов и доходов, что помогает лучше понимать текущие финансы;
- Графики автоматически обновляются при изменении данных, обеспечивая актуальность представленной информации.
4. Импорт и экспорт данных:
- Добавлена функциональность импорта и экспорта данных в формате JSON, что позволяет пользователям сохранять свои данные и восстанавливать их при необходимости;
- Импорт и экспорт осуществляются через взаимодействие с файловой системой браузера, что делает процесс простым и интуитивно понятным для пользователя.
5. Обеспечение гибкости и расширяемости:
- Приложение спроектировано таким образом, чтобы легко поддерживать добавление новых функций и возможностей;
- Код написан с учетом принципов модульности и повторного использования, что облегчает дальнейшую модификацию и расширение функционала.
6. Оптимизация производительности:
- Все операции с данными выполняются на стороне клиента, что минимизирует нагрузку на сервер и ускоряет отклик приложения;
- При этом важно учитывать ограничения localStorage, так как большие объемы данных могут негативно сказаться на производительности.
7. Безопасность и конфиденциальность:
- Несмотря на использование localStorage, в реальном проекте следует уделить особое внимание вопросам безопасности и конфиденциальности данных;
- Рекомендуется перенести хранение данных на сервер с использованием защищенных протоколов передачи данных (например, HTTPS) и механизмов аутентификации и авторизации.

Опишите рекомендации по устранению выявленных ошибок в ходе выполнения задачи:
1. Проблемы с вводом данных:
Описание: Пользователь может ввести неверные данные (например, отрицательные числа вместо положительных).
Рекомендация: Необходимо внедрить дополнительные проверки на стороне клиента и сервера для предотвращения ввода недопустимых значений. Например, можно использовать атрибуты HTML min, max и step для числовых полей, а также регулярные выражения для проверки строковых данных.
2. Ошибки в работе с localStorage:
Описание: Возможны проблемы с хранением и извлечением данных из localStorage. Например, если пользователь очищает кэш браузера, то данные могут быть потеряны.
Рекомендация: Нужно предусмотреть резервное копирование данных и уведомлять пользователя о том, что очистка кеша приведет к потере данных. Также стоит рассмотреть переход на серверное хранение данных для повышения надежности.
3. Отсутствие защиты от XSS-атак:
Описание: Веб-приложение уязвимо к атакам типа Cross-Site Scripting (XSS), поскольку данные, введенные пользователем, напрямую выводятся на страницу без предварительной очистки.
Рекомендация: Следует внедрить методы экранирования и санитации данных перед их отображением. Например, использовать функции для преобразования потенциально опасных символов в безопасные HTML-сущности.
4. Неоптимальная производительность:
Описание: При большом количестве транзакций или сложных вычислениях приложение может начать тормозить.
Рекомендация: Оптимизировать алгоритмы обработки данных, использовать асинхронные запросы и кеширование результатов расчетов. Рассмотреть возможность перехода на серверную часть для обработки больших объемов данных.
5. Неправильное отображение графиков:
Описание: Графики могут отображаться неправильно или вовсе не рендериться при определенных условиях (например, при отсутствии данных).
Рекомендация: Проверять наличие данных перед построением графиков и обрабатывать случаи отсутствия данных. Можно добавить сообщения об ошибках или предупреждения для пользователя.
6. Несоответствие стилей:
Описание: Внешний вид приложения может отличаться в различных браузерах или устройствах из-за различий в интерпретации CSS.
Рекомендация: Тестировать приложение в разных браузерах и на разных устройствах. Использовать кроссбраузерные CSS-решения и адаптивные подходы (например, медиа-запросы) для обеспечения согласованного внешнего вида.
7. Недостаточная безопасность аутентификации:
Описание: Хранение данных аутентификации в localStorage небезопасно и может привести к утечке информации.
Рекомендация: Переход на серверные решения для аутентификации и хранения токенов доступа. Использование JWT-токенов и шифрование передаваемых данных помогут повысить уровень безопасности.
