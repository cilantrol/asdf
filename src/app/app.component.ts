import { Subscription } from 'rxjs/Subscription';
import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  courses$: Observable<any>;
  course$;
  author$;
  coursesRef: AngularFireList<any>;
  // courses: any[];
  // subscription: Subscription;

  constructor(private db: AngularFireDatabase) {
    //this.courses$ = db.list('/courses').valueChanges();
    //  db.list('/courses').snapshotChanges().subscribe(c => {
    //   var temp = c.map(course => {
    //     var value = course.payload.val();
    //     return {
    //       key: course.payload.key,
    //       value: {
    //         name: value.name,
    //         price: value.price,
    //         isLive: value.isLive,
    //         sections: value.sections
    //       }
    //     }
    //   });
    //   this.courses$ = Observable.of(temp);
    // });
    this.courses$ = db.list('/courses').snapshotChanges();

    this.course$ = db.object('/courses/1').valueChanges();
    this.author$ = db.object('/authors/1').valueChanges();
    this.coursesRef = db.list('/courses/');

    // this.author$ = db.object('/authors/1').snapshotChanges();

    // console.log(this.author$.name);
    // this.subscription = db.list('/courses').valueChanges()
    //   .subscribe(courses => {
    //     this.courses = courses;
    //     console.log(this.courses);
    //   });
  }

  add(course: HTMLInputElement) {
    // this.coursesRef.push(course.value);
    // this.aflist.push({name: course.value});
    this.coursesRef.push( course.value);
    //   name: course.value,
    //   price: 150,
    //   isLive: true,
    //   sections: [
    //     {title: 'components1'},
    //     {title: 'components2'},
    //     {title: 'components3'}
    //   ]
    // });
    course.value = '';
  }

  update(course) {
    console.log(course);
    console.log(course.key);
    console.log(course.payload);
    console.log(course.payload.node_.value_);
    this.db.object('/courses/'+ course.key)
     .set(course.payload.node_.value_ + ' updated');
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
