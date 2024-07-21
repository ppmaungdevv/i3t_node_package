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
            tz: from_tz,
            time: from_time
        },
    to :
        {
            tz: to_tz,
            time: to_time
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
