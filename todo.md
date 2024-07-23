## Converter

- [x] validate from and to
  - ~~hour <= 12 or 24~~
  - ~~min < 59~~
  - ~~sec < 59~~
  - ~~use AM & PM~~
  - ~~tz must be in Moment tz format~~
  - [x] used time string and date string for more simple validation
- [x] throw error
- [ ] convert from and to
- [ ] return converted data in object

```
{
    from :
        {
            form_tz: from_tz,
            from_time: from_time
        },
    to :
        {
            to_tz: to_tz,
            to_time: to_time
        }
}
```

- [x] Use TDD

## Get Converted Time with Regions

return converted time for specific region||continent
conver(MMT, Europe) return all Europe time

## Get Supported Time Zone Lists

- [x] return all the moment time zone lists with array of objects

```
[
    'America/Los_Angeles', ....
]

```
