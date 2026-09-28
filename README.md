# Disney World Match

A quiz for Pixie Travel Co. clients. Guests answer 16 questions about their group, budget and style. The quiz then recommends three Walt Disney World resorts and restaurants grouped into character meals, table service and quick service, each with its dining plan credits and a menu link. Guests can also browse every restaurant and copy a summary to send to their advisor.

## What's included

- **Resorts (32):** every Disney-run resort, including all Disney Vacation Club villas, Fort Wilderness campsites and cabins, plus the Swan, Dolphin and Swan Reserve. Not included: Shades of Green (military only), the Disney Springs area hotels, and Disney Lakeshore Lodge (opening 2027).
- **Restaurants (140):** every table-service and character restaurant, and the main quick-service locations, at the four parks, the resort hotels and Disney Springs. Snack stands, carts, lounges and bars aren't included.
- **Dining plan credits:** based on the 2026 plans. Disney Springs and other restaurants that Disney doesn't run show "ask your advisor" until you confirm them.
- **Menu links:** most restaurants link to their official menu on disneyworld.disney.go.com. The rest link to a search of Disney's site. To add an exact link, set `menu` in `data.js`.

It is a plain website (HTML, CSS and JavaScript). There's no build step, server or database.

## Files

| File | What it is | How often you'll touch it |
| --- | --- | --- |
| `data.js` | Every resort and restaurant, with the traits the quiz matches on | Often: whenever Disney changes something |
| `app.js` | The questions and the scoring rules | Sometimes: to add a question or tune weights |
| `styles.css` | Colors, fonts and layout | Rarely |
| `index.html` | The page shell | Rarely |

## How the matching works

1. Each resort in `data.js` has traits: price tier, how many it sleeps, transportation, how easy each park is to reach (1 to 3), vibe, pool quality, and the groups it suits.
2. Each answer adds or subtracts points for resorts with matching traits. For example, "Monorail" adds 15 points to monorail resorts, and each park the guest picks adds up to 20 points for resorts close to it.
3. Rooms that can't fit the party are removed. Resorts above the guest's budget lose points but can still show up if everything else fits.
4. The top three resorts are shown with the reasons they matched.
5. Restaurants work the same way: character preference, meal style, dining plan, price, picky vs. adventurous eaters, favorite stories, celebrations, and whether it's at the top resort or in a favorite park.

All the weights live in `scoreResort` and `scoreRestaurant` in `app.js`.

## Common edits

**Add a restaurant:** copy an existing entry in the `restaurants` list in `data.js` and change the values. The field meanings are listed at the top of the file.

**Remove a restaurant that closed:** delete its entry.

**Change a character lineup or description:** edit `chars` or `note`.

**Try it locally:** open `index.html` in a browser.

## Putting it online

The simplest free option is GitHub Pages: in the repository's Settings, open Pages, choose "Deploy from a branch", and pick the branch and `/ (root)`. You'll get a link you can share with clients or put on your website.

## Ideas for next steps

- Send results straight to the advisor (for example with a form service such as Formspree, or a Google Form) instead of copy and paste.
- Add questions about accessibility, trip length, or Lightning Lane interest.
- Add resort photos and links to your booking page.
- Add Universal Orlando or Disneyland versions using the same structure.

Resort and dining details were current as of the first draft. Please review `data.js` before sharing with clients.
